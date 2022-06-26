import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // Find books
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  // Find book by id
  async detail(bookId: string): Promise<Book> {
    const bookExists = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['user'],
    });

    if (!bookExists) {
      throw new NotFoundException('Book not found.');
    }

    return bookExists;
  }

  // Create book
  async create(createBookDto: CreateBookDto, user): Promise<Book> {
    const book = this.bookRepository.create({
      name: createBookDto.name,
      price: createBookDto.price,
      author: createBookDto.author,
      user: user,
    });

    return await this.bookRepository.save(book);
  }

  // Update book
  async update(bookId: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookExists = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!bookExists) {
      throw new NotFoundException('Book not found.');
    }

    Object.assign(bookExists, updateBookDto);

    await this.bookRepository.save(bookExists);

    return bookExists;
  }

  // Delete book
  async delete(bookId: string): Promise<Book> {
    const bookExists = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!bookExists) {
      throw new NotFoundException('Book not found.');
    }

    return await this.bookRepository.remove(bookExists);
  }
}
