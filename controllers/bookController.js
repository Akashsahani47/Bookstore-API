import { readFile, writeFile } from 'fs/promises';
const bookFile = './data/books.json';

const readBooks = async () => JSON.parse(await readFile(bookFile, 'utf-8'));
const writeBooks = async (books) => await writeFile(bookFile, JSON.stringify(books, null, 2));

// GET All Books (with Pagination)
export const getAllBooks = async (req, res) => {
  try {
    const books = await readBooks();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = books.slice(start, start + limit);

    res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      page,
      limit,
      total: books.length,
      totalPages: Math.ceil(books.length / limit),
      data: paginated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch books', error: error.message });
  }
};

// GET Book by ID
export const getBookById = async (req, res) => {
  try {
    const books = await readBooks();
    const book = books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, message: 'Book fetched successfully', book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch book', error: error.message });
  }
};

// CREATE Book
export const createBook = async (req, res) => {
  try {
    const books = await readBooks();
    const book = {
      id: Date.now().toString(),
      ...req.body,
      userId: req.user.id,
    };
    books.push(book);
    await writeBooks(books);
    res.status(201).json({ success: true, message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create book', error: error.message });
  }
};

// UPDATE Book
export const updateBook = async (req, res) => {
  try {
    const books = await readBooks();
    const index = books.findIndex((b) => b.id === req.params.id);
    if (index === -1 || books[index].userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Book not found or unauthorized' });
    }
    books[index] = { ...books[index], ...req.body };
    await writeBooks(books);
    res.status(200).json({ success: true, message: 'Book updated successfully', book: books[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update book', error: error.message });
  }
};

// DELETE Book
export const deleteBook = async (req, res) => {
  try {
    const books = await readBooks();
    const index = books.findIndex((b) => b.id === req.params.id);
    if (index === -1 || books[index].userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Book not found or unauthorized' });
    }
    books.splice(index, 1);
    await writeBooks(books);
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete book', error: error.message });
  }
};
