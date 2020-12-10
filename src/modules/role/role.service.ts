import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from './role.repository';
import { RoleResponseDto } from './dto/role-response.dto';

@Injectable()
export class RoleService {
  constructor(private readonly _roleRepository: RoleRepository) {}

  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this._roleRepository.find({ isAdministrator: false });
    return roles.map(el => plainToClass(RoleResponseDto, el));
  }
}
