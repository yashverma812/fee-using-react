// Menu + testimonial data (arrays of objects) — same content as the original project.
export const menuItems = [
  { id: 1,  name: 'Caramel Macchiato',  category: 'Coffee',     price: 220, rating: 4.8, description: 'Rich espresso blended with creamy milk and caramel.', image: 'https://images.pexels.com/photos/15800983/pexels-photo-15800983.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 2,  name: 'Classic Cappuccino', category: 'Coffee',     price: 180, rating: 4.7, description: 'Espresso topped with steamed milk and thick foam.',      image: 'https://images.pexels.com/photos/28496565/pexels-photo-28496565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 3,  name: 'Flat White',         category: 'Coffee',     price: 200, rating: 4.6, description: 'Smooth double espresso with silky micro-foam.',        image: 'https://images.pexels.com/photos/36851643/pexels-photo-36851643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 4,  name: 'Hazelnut Latte',     category: 'Coffee',     price: 240, rating: 4.9, description: 'Espresso with steamed milk and roasted hazelnut syrup.', image: 'https://images.pexels.com/photos/15801056/pexels-photo-15801056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 5,  name: 'Iced Americano',     category: 'Cold Drinks',price: 160, rating: 4.4, description: 'Chilled espresso shots over water and ice.',           image: 'https://images.pexels.com/photos/4869290/pexels-photo-4869290.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 6,  name: 'Cold Brew Coffee',   category: 'Cold Drinks',price: 210, rating: 4.7, description: 'Slow-steeped 18 hours for a smooth, low-acidity brew.', image: 'https://images.pexels.com/photos/17298820/pexels-photo-17298820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 7,  name: 'Iced Caramel Latte', category: 'Cold Drinks',price: 230, rating: 4.8, description: 'Cold milk espresso with caramel drizzle over ice.',    image: 'https://images.pexels.com/photos/20854091/pexels-photo-20854091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 8,  name: 'Masala Chai',        category: 'Tea',        price: 120, rating: 4.6, description: 'Spiced black tea brewed with milk and cardamom.',      image: 'https://images.pexels.com/photos/30742323/pexels-photo-30742323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 9,  name: 'Green Tea',          category: 'Tea',        price: 110, rating: 4.3, description: 'Light, refreshing sencha green tea leaves.',           image: 'https://images.pexels.com/photos/2480399/pexels-photo-2480399.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 10, name: 'Hot Chocolate',      category: 'Tea',        price: 150, rating: 4.7, description: 'Rich cocoa topped with whipped cream and drizzle.',    image: 'https://images.pexels.com/photos/20854097/pexels-photo-20854097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 11, name: 'Butter Croissant',   category: 'Pastries',   price: 90,  rating: 4.5, description: 'Flaky, buttery French croissant baked fresh daily.',   image: 'https://images.pexels.com/photos/13439698/pexels-photo-13439698.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 12, name: 'Almond Croissant',   category: 'Pastries',   price: 120, rating: 4.8, description: 'Croissant filled with almond cream and toasted flakes.',image: 'https://images.pexels.com/photos/29125004/pexels-photo-29125004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 13, name: 'Blueberry Muffin',   category: 'Pastries',   price: 100, rating: 4.4, description: 'Soft muffin packed with fresh blueberries.',           image: 'https://images.pexels.com/photos/8017963/pexels-photo-8017963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 14, name: 'Chocolate Brownie',  category: 'Desserts',   price: 140, rating: 4.9, description: 'Fudgy chocolate brownie dusted with cocoa.',           image: 'https://images.pexels.com/photos/38028980/pexels-photo-38028980.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 15, name: 'Choco Lava Cake',    category: 'Desserts',   price: 180, rating: 4.9, description: 'Warm cake with a molten chocolate centre.',            image: 'https://images.pexels.com/photos/37418888/pexels-photo-37418888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 16, name: 'Caramel Cheesecake', category: 'Desserts',   price: 200, rating: 4.8, description: 'Creamy cheesecake topped with salted caramel.',        image: 'https://images.pexels.com/photos/24206900/pexels-photo-24206900.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
]

export const testimonials = [
  { id: 1, name: 'Aarav Sharma', role: 'Regular Customer',  rating: 5, text: 'Brew & Bean is my daily ritual. The Caramel Macchiato is the best in the city and the staff feel like family.' },
  { id: 2, name: 'Priya Nair',   role: 'Coffee Enthusiast', rating: 5, text: 'Beautiful interiors, calm music, and honestly the smoothest flat white I have ever had. My go-to study spot.' },
  { id: 3, name: 'Rohan Mehta',  role: 'Food Blogger',      rating: 4, text: 'The pastries are baked to perfection and the cold brew is dangerously good. Highly recommend the lava cake!' },
]

export const formatPrice = (n) => '₹' + n
export const findMenuItem = (id) => menuItems.find((m) => m.id === Number(id))
export const CATEGORIES = ['All', ...new Set(menuItems.map((m) => m.category))]
