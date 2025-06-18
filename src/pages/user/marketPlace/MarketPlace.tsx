import React, { useState } from "react";
import styles from "./MarketPlace.module.scss";
import MarketPlaceCard from "../../../components/user/marketPlaceCard/MarketPlaceCard";
import eventImage from "../../../assets/images/eventImage.jpg";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price?: number; // Optional if you plan to use it
  quantity?: number; // Optional if you plan to use it
}

const MarketPlace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All Categories",
    "Textbooks",
    "Electronics",
    "Furniture",
    "Services",
  ];

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "1",
      title: "Calculus Textbook",
      description: "Used, good condition, some highlighting",
      image: eventImage,
      category: "Textbooks",
      price: 20,
      quantity: 1, // Optional if you plan to use it
    },
    {
      id: "2",
      title: "Laptop - Excellent Condition",
      description: "15-inch, 8GB RAM, 256GB SSD",
      image: eventImage,
      category: "Electronics",
      price: 500,
      quantity: 1, // Optional if you plan to use it
    },
    {
      id: "3",
      title: "Dorm Room Desk",
      description: "Compact, perfect for small spaces",
      image: eventImage,
      category: "Furniture",
      price: 100,
      quantity: 2, // Optional if you plan to use it
    },
    {
      id: "4",
      title: "Tutoring Services - Math",
      description: "Experienced tutor, flexible hours",
      image: eventImage,
      category: "Services",
      price: 50,
      quantity: 3, // Optional if you plan to use it
    },
    {
      id: "5",
      title: "Bike - Like New",
      description: "Ridden only a few times, includes lock",
      image: eventImage,
      category: "Electronics",
      price: 300,
      quantity: 4, // Optional if you plan to use it
    },
  ];

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All Categories" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / 6);

  return (
    <div className={styles.marketplace}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Marketplace</h1>
          <p className={styles.subtitle}>
            Buy and sell items with fellow students
          </p>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search for items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.categoriesSection}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.map((filteredItem) => (
          <MarketPlaceCard key={filteredItem.id} filteredItem={filteredItem} />
        ))}

        <div className={styles.pagination}>
          <button
            className={styles.paginationArrow}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.paginationButton} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={styles.paginationArrow}
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
