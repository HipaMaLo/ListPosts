import {ref, Ref} from 'vue'
import IPost from '@/Interfaces/IPost'

class PostService{

    private posts:Ref<Array<IPost>> 

    constructor(){
        this.posts = ref<Array<IPost>>([])
    }

    getPosts():Ref<Array<IPost>>{
        return this.posts
    }
     
    async fetchAll():Promise<void>{
         try {
                const url = 'https://jsonplaceholder.typicode.com/posts'
                const response = await fetch(url)
                this.posts.value = await response.json()
                
    } catch (error) {
            console.error('Error fetching posts:', error)
            throw error
        }   
    }
}


export default PostService;