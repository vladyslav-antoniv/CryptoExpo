import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Dimensions
} from 'react-native';
import axios from 'axios';
import { ORANGE_COLOR } from '../constants/colors';

// Images
import ArrowLeft from '../images/arrow-dropdown-black.svg';

// ВАЖЛИВО: Переконайся, що файл з рецептом називається recipe.png і лежить в цій папці
const RecipeImage = require('../images/home/recipe.png'); 

const { width } = Dimensions.get('window');

export default function PostDetailsScreen({ route, navigation }: any) {
  const { postId } = route.params; // Отримуємо ID поста
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      // 1. Отримуємо пост
      const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      // 2. Отримуємо коментарі
      const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      
      setPost(postRes.data);
      setComments(commentsRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ORANGE_COLOR} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* Хедер з кнопкою назад */}
        <View style={styles.header}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft width={24} height={24} />
           </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Заголовок Поста */}
          <Text style={styles.postTitle}>
            {post?.title ? post.title.charAt(0).toUpperCase() + post.title.slice(1) : 'Post Name'}
          </Text>

          {/* Картинка (Recipe) */}
          <View style={styles.imageContainer}>
             <Image source={RecipeImage} style={styles.image} resizeMode="contain" />
          </View>

          {/* Секція ABOUT */}
          <Text style={styles.sectionLabel}>About</Text>
          <View style={styles.card}>
             <Text style={styles.cardTitle}>What is Lorem Ipsum?</Text>
             <Text style={styles.cardBody}>
               {post?.body 
                 ? post.body.charAt(0).toUpperCase() + post.body.slice(1) 
                 : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
             </Text>
          </View>

          {/* Секція COMMENTS */}
          <Text style={styles.sectionLabel}>Comments</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.card}>
               <Text style={styles.commentName}>
                 {comment.name.split(' ').slice(0, 2).join(' ')}
               </Text>
               <Text style={styles.commentEmail}>{comment.email}</Text>
               <Text style={styles.commentBody}>
                 {comment.body.replace(/\n/g, ' ')}
               </Text>
            </View>
          ))}

          {/* Кнопка Back внизу */}
          <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.goBack()}>
             <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' }, // Сірий фон як на макеті
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    marginBottom: 10
  },
  backBtn: {
    width: 40, height: 40, justifyContent: 'center'
  },

  scrollContent: {
    paddingBottom: 40
  },

  // Заголовок
  postTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    paddingHorizontal: 24
  },

  // Зображення
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    width: width - 48,
    height: 220,
    borderRadius: 20
  },

  // Лейбли секцій (About, Comments)
  sectionLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
    marginLeft: 24 
  },

  // Білі картки
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2
  },
  
  // Стилі всередині карток
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 10,
    color: '#333'
  },
  cardBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#555',
    lineHeight: 22
  },

  // Стилі коментарів
  commentName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 2
  },
  commentEmail: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#555',
    marginBottom: 10
  },
  commentBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#444',
    lineHeight: 18
  },

  // Кнопка знизу
  btnPrimary: {
    backgroundColor: ORANGE_COLOR,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: ORANGE_COLOR, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  btnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#FFF'
  }
});