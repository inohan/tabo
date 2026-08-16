import { Test, TestingModule } from '@nestjs/testing';
import { AdjudicatorController } from './adjudicator.controller';

describe('AdjudicatorController', () => {
  let controller: AdjudicatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdjudicatorController],
    }).compile();

    controller = module.get<AdjudicatorController>(AdjudicatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
