import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCourseTable1714166515561 } from 'src/migrations/1714166515561-CreateCourseTable';
import { CreateTagsTable1714167429661 } from 'src/migrations/1714167429661-CreateTagsTable';
import { CreateCoursesTagsTable1714168277925 } from 'src/migrations/1714168277925-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTags1714174725690 } from 'src/migrations/1714174725690-AddCoursesIdToCoursesTags';
import { AddTagsIdToCoursesTagsTable1714175364085 } from 'src/migrations/1714175364085-AddTagsIdToCoursesTagsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCourseTable1714166515561,
    CreateTagsTable1714167429661,
    CreateCoursesTagsTable1714168277925,
    AddCoursesIdToCoursesTags1714174725690,
    AddTagsIdToCoursesTagsTable1714175364085,
  ],
});
