from PIL import Image
import pytesseract
import re


# Set the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'  # Adjust the path as needed

# Function to convert an image to text using Tesseract OCR
def img_to_text(receipt):
    img = Image.open(receipt)  # Open the image using the PIL library
    text = pytesseract.image_to_string(img)  # Use Tesseract OCR to extract text from the image
    return text

# Function to extract items (item names, quantities, and prices) from text
def extract_items(text):
    items = {}
    receipt_lines = text.split('\n')  # Split the text into lines

    for line in receipt_lines:
        price_pattern = re.compile(r'\$?\s?\d+(\.\d{1,2})?')  # Regular expression to match prices
        prices = price_pattern.findall(line)  # Find all prices in the line

        words = line.split()  # Split the line into words
        if words and words[0].isdigit():
            quantity = int(words[0])  # If the first word is a digit, interpret it as the quantity
            item_name = ' '.join(words[1:])  # Join the remaining words as the item name
            price = float(prices[0]) if prices else 0.0  # Convert the price if available, otherwise set to 0.0
            items[item_name] = {'quantity': quantity, 'price': price}

    return items

# Function to extract totals (total, subtotal, tax) from text
def extract_totals(text):
    totals = {'total': 0.0, 'subtotal': 0.0, 'tax': 0.0}
    lines = text.split('\n')  # Split the text into lines

    for line in lines:
        if 'total' in line.lower():
            totals['total'] = float(line.split('$')[-1].strip())
        elif 'subtotal' in line.lower():
            totals['subtotal'] = float(line.split('$')[-1].strip())
        elif 'tax' in line.lower():
            totals['tax'] = float(line.split('$')[-1].strip())

    return totals

# Main block executed when the script is run
if __name__ == '__main__':
    receipt = input("Enter name of picture: ")  # Prompt the user to enter the image file name
    img_to_text_result = img_to_text(receipt)  # Convert the image to text using Tesseract OCR
    print("Extracted Text:")
    print(img_to_text_result)

    # Extract items from the text and display the dictionary
    extracted_items = extract_items(img_to_text_result)
    print("\nExtracted Items:")
    for item_name, details in extracted_items.items():
        print(f"Item Name: {item_name}, Quantity: {details['quantity']}, Price: {details['price']}")

    # Extract totals from the text and display the dictionary
    extracted_totals = extract_totals(img_to_text_result)
    print("\nExtracted Totals:")
    print(extracted_totals)
