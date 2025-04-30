# Proyecto Vue 3 - Post List

Este proyecto implementa un componente en Vue 3 llamado `PostList.vue` que consume un servicio externo para listar publicaciones (`posts`). Se utiliza TypeScript para garantizar el tipado estático y la estructura clara del código.

## Estructura del Proyecto

```
📁 src/
├── components/
│   └── PostList.vue
├── interfaces/
│   └── IPost.ts
└── services/
    └── PostService.ts
```

---

## Componentes y Conceptos Usados

### ✅ 1. Composición de Componentes (Composition API)

Se utiliza `setup` y funciones del Composition API (`onMounted`) para organizar la lógica del componente de forma clara y escalable:

```ts
<script lang="ts" setup>
import { onMounted } from 'vue';
import PostService from '@/services/PostService';

const service = new PostService();
const posts = service.getPosts();

onMounted(async () => {
  await service.fetchAll();
});
</script>
```

### ✅ 2. Tipado con TypeScript

El modelo de datos para los posts se define en una interfaz `IPost.ts`, lo que permite un tipado seguro en todo el proyecto:

```ts
interface IPost {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export default IPost;
```

Esto ayuda a mantener consistencia y detectar errores durante el desarrollo.

### ✅ 3. Servicios para Separación de Responsabilidades

El archivo `PostService.ts` encapsula la lógica de obtención de datos, separándola de la vista (componente):

```ts
class PostService {
  private posts: Ref<Array<IPost>>;

  constructor() {
    this.posts = ref<Array<IPost>>([]);
  }

  getPosts(): Ref<Array<IPost>> {
    return this.posts;
  }

  async fetchAll(): Promise<void> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(url);
    this.posts.value = await response.json();
  }
}
```

Este patrón permite reutilizar la lógica de negocio en otros componentes y facilita pruebas unitarias.

### ✅ 4. Reactividad con `ref`

Se usa `ref` para hacer reactiva la lista de publicaciones, lo cual permite que el componente Vue reaccione automáticamente a los cambios:

```ts
private posts: Ref<Array<IPost>> = ref([]);
```

---

## Flujo de Datos

1. El componente `PostList.vue` instancia `PostService`.
2. Llama a `getPosts()` para obtener la referencia reactiva a los datos.
3. En `onMounted`, ejecuta `fetchAll()` para obtener los datos de la API.
4. Al actualizarse la propiedad `posts.value`, la vista se actualiza automáticamente.

---

## Buenas Prácticas Aplicadas

- **Separación de lógica y presentación**: La lógica de negocio se encuentra fuera del componente.
- **Uso de Composition API**: Facilita escalabilidad y legibilidad.
- **Consistencia con tipado**: Previene errores comunes al manipular datos.
- **Responsabilidad única**: Cada clase o archivo cumple una función específica.

---

## Recursos

- [Vue 3 Composition API](https://vuejs.org/guide/introduction.html)
- [TypeScript en Vue](https://vuejs.org/guide/typescript/overview.html)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)