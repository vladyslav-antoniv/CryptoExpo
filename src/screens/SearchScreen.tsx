import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  SafeAreaView, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';
import { ORANGE_COLOR } from '../constants/colors';
import SearchIcon from '../images/menu/item 3.svg'; 

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setFilteredDataSource(response.data);
      setMasterDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text style={styles.titleText}>
           Name: {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerWhite}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Search</Text>
        
        {/* Поле пошуку */}
        <View style={styles.searchSection}>
            <View style={{ paddingLeft: 12 }}>
               {/* Лупа (сіра) */}
               <SearchIcon width={20} height={20} fill="#999" /> 
            </View>
            
            <TextInput
              style={styles.input}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              placeholder="Search Products..."
              placeholderTextColor="#999"
            />
        </View>

        {loading ? (
           <ActivityIndicator size="large" color={ORANGE_COLOR} style={{marginTop: 20}}/>
        ) : (
           <FlatList
             data={filteredDataSource}
             keyExtractor={(item, index) => index.toString()}
             renderItem={ItemView}
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{ paddingBottom: 20 }}
             ListEmptyComponent={
               <Text style={styles.emptyText}>No posts found</Text>
             }
           />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWhite: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    marginBottom: 20,
    color: '#000'
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 50,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#000',
    height: 50,
  },
  itemStyle: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  idText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 4
  },
  titleText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#666'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontFamily: 'Inter_400Regular',
    fontSize: 16
  }
});