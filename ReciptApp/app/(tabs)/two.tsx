import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Text, Button } from 'react-native';

interface Item {
  name: string;
  price: string;
  isSelected: boolean;
  consumedPercentage: number;
}

interface CustomCheckboxProps {
  isSelected: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isSelected, onPress }) => {
  return (
    <TouchableOpacity style={isSelected ? styles.checkboxSelected : styles.checkbox} onPress={onPress}>
      {isSelected && <Text style={styles.checkboxText}>✓</Text>}
    </TouchableOpacity>
  );
};

export default function TabTwoScreen() {
  const [items, setItems] = useState<Item[]>([
    { name: 'Pizza', price: '10.90', isSelected: false, consumedPercentage: 100 },
    { name: 'Burger', price: '8.60', isSelected: false, consumedPercentage: 100 },
    { name: 'Soup', price: '9.25', isSelected: false, consumedPercentage: 100 },
    { name: 'Crab', price: '8.50', isSelected: false, consumedPercentage: 100 },
    { name: 'Sushi', price: '15.00', isSelected: false, consumedPercentage: 100 },
    { name: 'Water', price: '8.09', isSelected: false, consumedPercentage: 100 },
    { name: 'Fries', price: '13.10', isSelected: false, consumedPercentage: 100 },
    { name: 'Ham', price: '1.34', isSelected: false, consumedPercentage: 100 },
  ]);

  const [rowCount, setRowCount] = useState(8); // Initial row count

  const handleNameChange = (index: number, newName: string) => {
    const newItems = [...items];
    newItems[index].name = newName;
    setItems(newItems);
  };

  const handlePriceChange = (index: number, newPrice: string) => {
    const newItems = [...items];
    newItems[index].price = newPrice; // Set the price directly without formatting
    setItems(newItems);
  };  

  const handlePriceBlur = (index: number) => {
    const newItems = [...items];
    const formattedPrice = parseFloat(newItems[index].price).toFixed(2); // Round off to two decimal places
    newItems[index].price = formattedPrice;
    setItems(newItems);
  };

  const handlePercentageChange = (index: number, newPercentage: string) => {
    const newItems = [...items];
    const percentageValue = newPercentage.replace('%', '');
    const percentage = parseInt(percentageValue, 10) || 0;
    newItems[index].consumedPercentage = percentage;
    setItems(newItems);
  };
  
  const handlePercentageBlur = (index: number) => {
    const newItems = [...items];
    let percentage = newItems[index].consumedPercentage;
    percentage = percentage > 100 ? 100 : percentage; // Ensures percentage does not exceed 100
    newItems[index].consumedPercentage = percentage;
    setItems(newItems);
  };

  const toggleCheckbox = (index: number) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  const renderItem = (item: Item, index: number) => (
    <View key={index} style={styles.itemRow}>
      <TextInput
        style={styles.itemName}
        value={item.name}
        onChangeText={(newName) => handleNameChange(index, newName)}
      />
      <TextInput
        style={styles.itemPrice}
        value={item.price}
        keyboardType='numeric'
        onChangeText={(newPrice) => handlePriceChange(index, newPrice)}
        onBlur={() => handlePriceBlur(index)} // Add this line
      />
      <View style={styles.checkboxContainer}>
        {item.isSelected && (
          <TextInput
            style={styles.percentageInput}
            value={`${item.consumedPercentage}%`}
            keyboardType='numeric'
            onChangeText={(newPercentage) => handlePercentageChange(index, newPercentage)}
            onBlur={() => handlePercentageBlur(index)} 
          />
        )}
        <CustomCheckbox
          isSelected={item.isSelected}
          onPress={() => toggleCheckbox(index)}
        />
      </View>
    </View>
  );

  // Function to reset items to their default values
  const resetItems = () => {
    const defaultItems = [
      { name: 'Pizza', price: '10.90', isSelected: false, consumedPercentage: 100 },
      { name: 'Burger', price: '8.60', isSelected: false, consumedPercentage: 100 },
      { name: 'Soup', price: '9.25', isSelected: false, consumedPercentage: 100 },
      { name: 'Crab', price: '8.50', isSelected: false, consumedPercentage: 100 },
      { name: 'Sushi', price: '15.00', isSelected: false, consumedPercentage: 100 },
      { name: 'Water', price: '8.09', isSelected: false, consumedPercentage: 100 },
      { name: 'Fries', price: '13.10', isSelected: false, consumedPercentage: 100 },
      { name: 'Ham', price: '1.34', isSelected: false, consumedPercentage: 100 },
    ];
    setItems(defaultItems);
    setRowCount(8); // Reset row count
  };

  const addItemRow = () => {
    setRowCount(rowCount + 1); // Increment row count
    const newItem = { name: '', price: '', isSelected: false, consumedPercentage: 100 };
    setItems([...items, newItem]);
  };

  const deleteItemRow = () => {
    if (rowCount > 0) {
      setRowCount(rowCount - 1); // Decrement row count
      const updatedItems = [...items];
      updatedItems.pop(); // Remove the last item
      setItems(updatedItems);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Items</Text>

      {items.map(renderItem)}
      
      {/* Add Row and Delete Row Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Add Row" onPress={addItemRow} />
        <Button title="Delete Row" onPress={deleteItemRow} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Add some space between the title and items
    textAlign: 'center', // Center the title
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 5,
  },
  itemPrice: {
    width: 80,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  checkboxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  percentageInput: {
    width: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});