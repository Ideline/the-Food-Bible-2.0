export default {
    categories: [
        {
            id: 1,
            title: "Smårätter",
            img: "/small-dishes.jpg",
            subCategories: [
                {
                    id: 1,
                    mainCategoryId: 1,
                    title: "Tapas",
                    img: "/tapas.jpg"
                },
                {
                    id: 2,
                    mainCategoryId: 1,
                    title: "Förrätter",
                    img: "/starters.jpg"
                }
            ]
        },
        {
            id: 2,
            title: "Middag",
            img: "/dinner.png",
            subCategories: [
                {
                    id: 1,
                    mainCategoryId: 2,
                    title: "Fågel",
                    img: "/poultry.jpg"
                },
                {
                    id: 2,
                    mainCategoryId: 2,
                    title: "Kött",
                    img: "/meat.jpg"
                },
                {
                    id: 3,
                    mainCategoryId: 2,
                    title: "Fisk",
                    img: "/fish.jpg"
                },
                {
                    id: 4,
                    mainCategoryId: 2,
                    title: "Vegetariskt",
                    img: "/veggie.jpg"
                },
                {
                    id: 5,
                    mainCategoryId: 2,
                    title: "Pasta",
                    img: "/pasta.jpg"
                },
                {
                    id: 6,
                    mainCategoryId: 2,
                    title: "Skaldjur",
                    img: "/seafood.png"
                }
            ]
        },
        {
            id: 3,
            title: "Godsaker",
            img: "/goodies.jpg",
            subCategories: [
                {
                    id: 1,
                    mainCategoryId: 3,
                    title: "Bröd",
                    img: "/bread.jpg"
                },
                {
                    id: 2,
                    mainCategoryId: 3,
                    title: "Tårtor",
                    img: "/cake.jpg"
                },
                {
                    id: 3,
                    mainCategoryId: 3,
                    title: "Bakelser",
                    img: "pastries.jpg"
                },
                {
                    id: 4,
                    mainCategoryId: 3,
                    title: "Småkakor",
                    img: "/cookies.jpg"
                },
                {
                    id: 5,
                    mainCategoryId: 3,
                    title: "Desserter",
                    img: "/desserts.jpg"
                },
                {
                    id: 6,
                    mainCategoryId: 3,
                    title: "Glass",
                    img: "/icecream.jpeg"
                }
            ]
        }
    ]
}