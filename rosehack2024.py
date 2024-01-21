from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'  # Adjust the path as needed

def img_to_text(receipt):  # converting image to text
    img = Image.open(receipt)
    text = pytesseract.image_to_string(img)
    return text

def extract_items(text):
    items = {}

    lines = text.split('\n')

    for line in lines:
        if '$' in line:
            items_list = line.split('$')
            item_name = items_list[0].strip()
            price = float(items_list[1].strip())

            words = item_name.split()
            if words and words[0].isdigit():
                item_number = int(words[0])
                items[item_name] = {'item_number': item_number, 'price': price}


def extract_totals(text):
    totals = {
        'total': 0.0,
        'subtotal': 0.0,
        'tax': 0.0
    }

    lines = text.split('\n')

    for line in lines:
        if 'total' in line.lower():
            totals['total'] = float(line.split('$')[-1].strip())
        elif 'subtotal' in line.lower():
            totals['subtotal'] = float(line.split('$')[-1].strip())
        elif 'tax' in line.lower():
            totals['tax'] = float(line.split('$')[-1].strip())

    return totals

if __name__ == '__main__':
    receipt = input("Enter name of picture: ")
    img_to_text = img_to_text(receipt)
    print(img_to_text)