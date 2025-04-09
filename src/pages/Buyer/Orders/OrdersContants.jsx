export const orderColumns = [
    {
      key: "image",
      label: "image",
    },
    { key: "title", label: "bookTitle" },
    { key: "author", label: "author" },
    { key: "price", label: "price", render: (value) => `Rs. ${value}/-` },
  ];

