import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BookService } from './book.service';
import {CreateBookDto} from "../user/dto/create-book.dto";
import {UpdateBookDto} from "../user/dto/update-book.dto";

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async list(){
    return await this.bookService.list()
  }
  @Get(':id')
  async findById(@Param('id') id: string){
    return await this.bookService.findById(+id)
  }
  @Put('update')
  async update(@Body() updateBook: UpdateBookDto){
    return await this.bookService.update(updateBook)
  }
  @Post('create')
  async create(@Body() createBooks: CreateBookDto){
    return await this.bookService.create(createBooks);
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: string){
    return await this.bookService.delete(+id);
  }
}
