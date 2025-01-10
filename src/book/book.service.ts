import {BadRequestException, Body, Inject, Injectable} from '@nestjs/common';
import {CreateBookDto} from "../user/dto/create-book.dto";
import {UpdateBookDto} from "../user/dto/update-book.dto";
import {DbService} from "../db/db.service";
import {Book} from "../user/entities/book.entity";

const randomNum = () => {
    return Math.floor(Math.random() * 1000000)
}

@Injectable()
export class BookService {
    @Inject()
    dbService: DbService;
    async list(){
        const books: Book[] = await this.dbService.read();
        return books;
    }
    async findById(id: number){
        const books: Book[] = await this.dbService.read();
        return books.find(book => book.id === id);
    }
    async create(createBookDto: CreateBookDto){
        const books: Book[] = await this.dbService.read();
        const book = new Book();
        book.id = randomNum();
        book.name = createBookDto.name;
        book.author = createBookDto.author;
        book.description = createBookDto.description;
        book.cover = createBookDto.cover;

        books.push(book)

        await this.dbService.write(books);
        return book;
    }
    async update(updateBookDto: UpdateBookDto){
        const books: Book[] = await this.dbService.read();
        const foundBook = books.find(item => item.id === updateBookDto.id);
        if (!foundBook){
            throw new BadRequestException('该图书不存在')
        }
        foundBook.name = updateBookDto.name;
        foundBook.author = updateBookDto.author;
        foundBook.cover = updateBookDto.cover;
        foundBook.description = updateBookDto.description;

        await this.dbService.write(books);
        return foundBook;
    }
    async delete(id: number){
        const books: Book[] = await this.dbService.read();
        const foundBookIndex = books.findIndex(item => item.id === id);
        if (foundBookIndex === -1){
            throw new BadRequestException('该图书不存在');
        }
        books.splice(foundBookIndex, 1);
        await this.dbService.write(books)

    }
}
