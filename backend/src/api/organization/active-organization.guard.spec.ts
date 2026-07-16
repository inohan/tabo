import { ActiveOrganizationGuard } from './active-organization.guard';

describe('OrganizationGuard', () => {
  it('should be defined', () => {
    expect(new ActiveOrganizationGuard()).toBeDefined();
  });
});
