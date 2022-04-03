async function fetchGraphQL(query) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query }),
        }
    ).then((response) => response.json())
}

function extractCars(fetchResponse) {
    return fetchResponse?.data?.carCollection?.items
}

function extractCar(fetchResponse) {
    return fetchResponse?.data?.carCollection?.items?.[0]
}

export async function getAllCars() {
    const products = await fetchGraphQL(
        `query CarsQuery{
      carCollection{
        items {
         slug
         header
         content
         footer
        }
      }
    }`)
    return extractCars(products)
}

export async function getCarDetailsBySlug(slug) {
    const entry = await fetchGraphQL(
        `query {
      carCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          slug
          header
          content
          footer
        }
      }
    }`,
        true
    )
    return extractCar(entry)
}


