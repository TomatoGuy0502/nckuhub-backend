import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from './entities/course.entity'

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private coursesRepository: Repository<Course>) {}

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find({
      relations: ['department']
    })
  }

  async findOneWithComments(courseId: string) {
    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['comments', 'department']
    })
    return course
  }
}
