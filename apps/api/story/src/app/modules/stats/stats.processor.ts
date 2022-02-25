import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('stats')
export class StatsProcessor {
  @Process('calculation-request')
  async calculationRequest(job: Job<unknown>) {
    debugger;
    console.log(job.data);
    return {};
  }
}
