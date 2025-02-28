import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DbModule} from './db/db.module';
import {BookModule} from './book/book.module';
import {FileModule} from './file/file.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [UserModule, DbModule, BookModule, FileModule, TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'xzy20000219',
        database: 'login_test',
        // synchronize: true
    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
