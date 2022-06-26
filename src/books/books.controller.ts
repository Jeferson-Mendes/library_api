import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findBooks(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @Get('/:bookId')
  async detail(@Param('bookId') bookId: string): Promise<Book> {
    return await this.booksService.detail(bookId);
  }

  @Put('/:bookId')
  async update(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.booksService.update(bookId, updateBookDto);
  }

  @Delete('/:bookId')
  async delete(@Param('bookId') bookId: string): Promise<Book> {
    return await this.booksService.delete(bookId);
  }
}
