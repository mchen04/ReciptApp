class Food:
    def __init__(self, price: float, name: str, quantity: int = 1):
        self.price = price
        self.name = name
        self.quantity = quantity
        self.cost_of_food = 0.0

    def normal_price(self):
        print(f"The base price of {self.name}: ${self.price:.2f}")

    def amount_ate(self, percent_ate: float):
        self.cost_of_food = self.price * percent_ate / 100

    def total_owed(self):
        print(f"Your total for {self.quantity} {self.name}(s) based on the percentage you ate is: ${self.cost_of_food:.2f}")

# Assuming extracted_items is the dictionary obtained from the receipt processing
extracted_items = {
    'Item 1': {'quantity': 1, 'price': 10.5},
    'Item 2': {'quantity': 2, 'price': 5.0},
    'Item 3': {'quantity': 3, 'price': 7.75}
}

# Create instances of Food based on extracted data
food_list = []
for item_name, details in extracted_items.items():
    food_list.append(Food(name=item_name, price=details['price'], quantity=details['quantity']))

# Process each food item
for food_item in food_list:
    food_item.normal_price()
    percent_ate = float(input(f"Enter the percentage you ate of %{food_item.name}: "))
    food_item.amount_ate(percent_ate)
    food_item.total_owed()
    print("\n")
