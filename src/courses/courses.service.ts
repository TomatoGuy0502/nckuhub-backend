import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CourseEntity } from './entities/course.entity'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity) private coursesRepository: Repository<CourseEntity>
  ) {}

  findAll(): Promise<CourseEntity[]> {
    return this.coursesRepository.find({
      relations: ['department']
    })
  }

  async findOneWithComments(courseId: string): Promise<CourseEntity> {
    const course = await this.coursesRepository.findOne(courseId, {
      relations: ['comments', 'department']
    })
    return course
  }
}
