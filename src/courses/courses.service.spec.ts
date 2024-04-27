import { randomUUID } from 'node:crypto';
import { CoursesService } from './courses.service';
import { create } from 'node:domain';
import { CreateCourseDTO } from './dto/create-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectOutputCouses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = [{ id, name: 'nestjs', created_at }];
    expectOutputCouses = {
      id,
      name: 'test',
      description: 'test description',
      created_at,
      tags: expectOutputTags,
    };

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCouses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    //@ts-expect-error define part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error define part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCouses).toStrictEqual(newCourse);
  });

  it('should list all course', async () => {
    //@ts-expect-error define part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error define part of methods
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCouses).toStrictEqual(courses);
  });
});
