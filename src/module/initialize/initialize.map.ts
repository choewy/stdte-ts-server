import { hashSync } from 'bcrypt';
import { DataSource, EntityManager } from 'typeorm';

import {
  CredentialsStatus,
  Role,
  RolePolicy,
  RolePolicyProperty,
  User,
  Credentials,
  RolePolicyLevel,
  UploadLogBatch,
  Setting,
  BusinessCategory,
  IndustryCategory,
  TaskMainCategory,
  TaskSubCategory,
  TimeRecordLog,
} from '@entity';
import { CredentialsConfig } from '@server/config';

export class InitializeMap {
  constructor(private readonly connection: DataSource | EntityManager) {}

  get setting() {
    const repository = this.connection.getRepository(Setting);

    return repository.create({ id: 1, difficultyTooltip: '' });
  }

  get uploadLogBatch() {
    const repository = this.connection.getRepository(UploadLogBatch);

    return repository.create({ id: 1, working: false });
  }

  get roles() {
    const repository = this.connection.getRepository(Role);

    return [
      repository.create({ id: 1, onInit: true, name: '개발자' }),
      repository.create({ id: 2, onInit: true, name: '관리자' }),
    ];
  }

  get rolePolicies() {
    const repository = this.connection.getRepository(RolePolicy);

    return [
      repository.create({
        id: 1,
        role: { id: 1 },
        onInit: true,
        roleAndPolicy: RolePolicyLevel.Developer,
        credentials: RolePolicyLevel.Developer,
        setting: RolePolicyLevel.Developer,
        customer: RolePolicyLevel.Developer,
        user: RolePolicyLevel.Developer,
        taskCategory: RolePolicyLevel.Developer,
        industryCategory: RolePolicyLevel.Developer,
        businessCategory: RolePolicyLevel.Developer,
        project: RolePolicyLevel.Developer,
      } as RolePolicyProperty),
      repository.create({
        id: 2,
        role: { id: 2 },
        onInit: true,
        roleAndPolicy: RolePolicyLevel.Admin,
        credentials: RolePolicyLevel.Admin,
        setting: RolePolicyLevel.Admin,
        customer: RolePolicyLevel.Admin,
        user: RolePolicyLevel.Admin,
        taskCategory: RolePolicyLevel.Admin,
        industryCategory: RolePolicyLevel.Admin,
        businessCategory: RolePolicyLevel.Admin,
        project: RolePolicyLevel.Admin,
      } as RolePolicyProperty),
    ];
  }

  get users() {
    const repository = this.connection.getRepository(User);

    return [
      repository.create({ id: 1, onInit: true, role: { id: 1 }, name: '개발자' }),
      repository.create({ id: 2, onInit: true, role: { id: 2 }, name: '관리자' }),
    ];
  }

  get credentials() {
    const repository = this.connection.getRepository(Credentials);

    const credentialsConfig = new CredentialsConfig();
    const developer = credentialsConfig.getDeveloperCredentials();
    const admin = credentialsConfig.getAdminCredentials();

    return [
      repository.create({
        id: 1,
        user: { id: 1 },
        onInit: true,
        email: developer.email,
        password: hashSync(developer.password, 10),
        status: CredentialsStatus.Active,
      }),
      repository.create({
        id: 2,
        user: { id: 2 },
        onInit: true,
        email: admin.email,
        password: hashSync(admin.password, 10),
        status: CredentialsStatus.Active,
      }),
    ];
  }

  get timeRecordLog() {
    const repository = this.connection.getRepository(TimeRecordLog);

    return [repository.create({ user: { id: 1 } }), repository.create({ user: { id: 2 } })];
  }

  get businessCategory() {
    const repository = this.connection.getRepository(BusinessCategory);

    return [
      repository.create({ id: 1, name: '기술', description: '엔지니어링 단가를 적용받는 모든 사업' }),
      repository.create({ id: 2, name: '연구', description: '국가연구개발혁신법을 적용받는 모든 사업' }),
      repository.create({ id: 3, name: '실험', description: '발주처의 의뢰를 받아 진행하는 실험/시험 관련 사업' }),
      repository.create({ id: 4, name: '판매', description: '제품의 제조, 판매와 관련된 사업' }),
      repository.create({ id: 5, name: '지원', description: '정부, 특정기관으로부터 지원받는 사업' }),
    ];
  }

  get industryCategory() {
    const repository = this.connection.getRepository(IndustryCategory);

    return [
      repository.create({ id: 1, name: '원전' }),
      repository.create({ id: 2, name: '원자력시설' }),
      repository.create({ id: 3, name: '비원자력' }),
    ];
  }

  get taskMainCategory() {
    const repository = this.connection.getRepository(TaskMainCategory);

    return [
      repository.create({
        id: 1,
        name: '일반',
        children: [
          { id: 1, parent: { id: 1 }, name: '사업개발' },
          { id: 2, parent: { id: 1 }, name: '부서관리' },
          { id: 3, parent: { id: 1 }, name: '교육/훈련' },
          { id: 4, parent: { id: 1 }, name: '기타업무' },
        ],
      }),
      repository.create({
        id: 2,
        name: '사업',
        children: [
          { id: 5, parent: { id: 2 }, name: '작성' },
          { id: 6, parent: { id: 2 }, name: '검토' },
          { id: 7, parent: { id: 2 }, name: '피드백' },
          { id: 8, parent: { id: 2 }, name: '출장이동' },
        ],
      }),
      repository.create({
        id: 3,
        name: '타부서 업무 지원',
        children: [],
      }),
    ];
  }

  get taskSubCategory() {
    const repository = this.connection.getRepository(TaskSubCategory);

    return [
      repository.create({ id: 1, parent: { id: 1 }, name: '사업개발' }),
      repository.create({ id: 2, parent: { id: 1 }, name: '부서관리' }),
      repository.create({ id: 3, parent: { id: 1 }, name: '교육/훈련' }),
      repository.create({ id: 4, parent: { id: 1 }, name: '기타업무' }),
      repository.create({ id: 5, parent: { id: 2 }, name: '작성' }),
      repository.create({ id: 6, parent: { id: 2 }, name: '검토' }),
      repository.create({ id: 7, parent: { id: 2 }, name: '피드백' }),
      repository.create({ id: 8, parent: { id: 2 }, name: '출장이동' }),
    ];
  }
}
