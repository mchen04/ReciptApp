import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Dummy data - replace this with the actual data passed from TabTwoScreen
const selectedItems = [
  { name: 'Pizza', price: 10.43, consumedPercentage: 50 },
  { name: 'Crab', price: 13.90, consumedPercentage: 23 },
  { name: 'Bear', price: 45.57, consumedPercentage: 78 },
  { name: 'Water', price: 90.12, consumedPercentage: 12 },
  { name: 'Pineapple', price: 123.34, consumedPercentage: 97 },
  { name: 'Strawberry', price: 21.53, consumedPercentage: 32 },
  { name: 'Chips', price: 65.39, consumedPercentage: 100 },
  { name: 'Steak', price: 95.23, consumedPercentage: 12 },
  { name: 'Fries', price: 18.23, consumedPercentage: 1 },
];

const TAX_PERCENTAGE = 0.10; // 10% tax, can be changed
const TIP_PERCENTAGE = 0.15; // 15% tip, can be changed

export default function TabThreeScreen() {
  let totalCost = 0;
  const itemsCosts = selectedItems.map(item => {
    const cost = (item.price * item.consumedPercentage) / 100;
    totalCost += cost;
    return { ...item, cost };
  });

  const tax = totalCost * TAX_PERCENTAGE;
  const subtotal = totalCost + tax;
  const tip = subtotal * TIP_PERCENTAGE;
  const finalCost = subtotal + tip;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Cost</Text>
      
      {itemsCosts.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text>{item.name}: ${item.price.toFixed(2)} ({item.consumedPercentage}%) - ${item.cost.toFixed(2)}</Text>
        </View>
      ))}
      
      <Text style={styles.costRow}>Tax ({TAX_PERCENTAGE * 100}%): ${tax.toFixed(2)}</Text>
      <Text style={styles.costRow}>Tip ({TIP_PERCENTAGE * 100}%): ${tip.toFixed(2)}</Text>
      <View style={styles.finalCostContainer}>
        <Text style={styles.finalCost}>Final Total: ${finalCost.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#90EE90',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center the title text
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center', // Center item rows
  },
  costRow: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', // Center cost rows
  },
  finalCostContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center', // Center final cost text
  },
  finalCost: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});