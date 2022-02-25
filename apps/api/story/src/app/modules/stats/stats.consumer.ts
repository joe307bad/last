import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('stats')
export class StatsConsumer {
  @Process('calculation-request')
  async calculationRequest(job: Job<unknown>) {
    debugger;
    console.log({ job });
    return {};
  }
}
