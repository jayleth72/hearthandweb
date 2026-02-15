# Sample GraphQL Queries for WordPress

Use these queries in your WordPress GraphQL IDE (https://your-site.com/graphql) to test your setup.

## Basic Queries

### Get All Posts (Simple)
```graphql
query GetAllPosts {
  posts(first: 10) {
    nodes {
      id
      title
      slug
      date
    }
  }
}
```

### Get All Posts (With Details)
```graphql
query GetAllPostsDetailed {
  posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
    edges {
      node {
        id
        title
        slug
        excerpt
        date
        modified
        author {
          node {
            name
            email
            avatar {
              url
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Get Single Post by Slug
```graphql
query GetPostBySlug($slug: String!) {
  post: postBy(slug: $slug) {
    id
    title
    slug
    content
    excerpt
    date
    modified
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
  }
}
```

**Query Variables:**
```json
{
  "slug": "your-post-slug"
}
```

### Get Categories
```graphql
query GetCategories {
  categories(first: 100, where: { hideEmpty: true }) {
    nodes {
      id
      name
      slug
      count
      description
    }
  }
}
```

### Get Posts by Category
```graphql
query GetPostsByCategory($categorySlug: String!) {
  posts(
    first: 10
    where: { 
      categoryName: $categorySlug
      orderby: { field: DATE, order: DESC }
    }
  ) {
    edges {
      node {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
```

**Query Variables:**
```json
{
  "categorySlug": "birthday-parties"
}
```

### Get Posts by Tag
```graphql
query GetPostsByTag($tagSlug: String!) {
  posts(
    first: 10
    where: { 
      tag: $tagSlug
      orderby: { field: DATE, order: DESC }
    }
  ) {
    edges {
      node {
        id
        title
        slug
        excerpt
        date
      }
    }
  }
}
```

**Query Variables:**
```json
{
  "tagSlug": "face-painting"
}
```

## Advanced Queries

### Get Posts with Pagination
```graphql
query GetPostsPaginated($first: Int!, $after: String) {
  posts(
    first: $first
    after: $after
    where: { orderby: { field: DATE, order: DESC } }
  ) {
    edges {
      cursor
      node {
        id
        title
        slug
        excerpt
        date
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Query Variables:**
```json
{
  "first": 5,
  "after": null
}
```

### Search Posts
```graphql
query SearchPosts($searchTerm: String!) {
  posts(
    first: 10
    where: { 
      search: $searchTerm
    }
  ) {
    edges {
      node {
        id
        title
        slug
        excerpt
        date
      }
    }
  }
}
```

**Query Variables:**
```json
{
  "searchTerm": "birthday"
}
```

### Get Recent Posts with Custom Fields (if using ACF)
```graphql
query GetPostsWithACF {
  posts(first: 5) {
    nodes {
      id
      title
      slug
      # Add your ACF fields here
      customFields {
        fieldName
        anotherField
      }
    }
  }
}
```

### Get Post with Comments
```graphql
query GetPostWithComments($slug: String!) {
  post: postBy(slug: $slug) {
    id
    title
    content
    comments(first: 10, where: { orderby: COMMENT_DATE_DESC }) {
      nodes {
        id
        content
        date
        author {
          node {
            name
          }
        }
      }
    }
    commentCount
  }
}
```

## Introspection Queries

### Get Schema Types
```graphql
query GetTypes {
  __schema {
    types {
      name
      kind
      description
    }
  }
}
```

### Get Post Type Fields
```graphql
query GetPostFields {
  __type(name: "Post") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
```

## Testing Tips

1. **Use Variables**: Always use variables for dynamic values (slugs, IDs, etc.)
2. **Start Small**: Begin with simple queries, then add more fields
3. **Check Response**: Verify data structure matches your TypeScript types
4. **Test Edge Cases**: Try queries with no results, invalid slugs, etc.
5. **Monitor Performance**: Large queries with many relations can be slow

## Common Issues

### Empty Results
- Check if posts are published (not drafts)
- Verify category/tag slugs are correct
- Ensure hideEmpty isn't filtering everything out

### Missing Fields
- Some fields require specific plugins (ACF, Yoast, etc.)
- Check WPGraphQL settings for enabled post types
- Verify field names are correct (case-sensitive)

### Slow Queries
- Limit the number of posts (`first: 10`)
- Avoid deeply nested relations
- Consider using pagination
- Check WordPress performance

## Next Steps

1. Test these queries in your GraphQL IDE
2. Modify them to match your needs
3. Copy successful queries to `src/lib/wordpress.ts`
4. Update TypeScript types in `src/types/wordpress.ts`
5. Use in your Next.js components

## Resources

- WPGraphQL IDE: https://your-site.com/graphql
- WPGraphQL Docs: https://www.wpgraphql.com/docs
- GraphQL Spec: https://graphql.org/learn/
