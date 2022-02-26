import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import got from 'got'

@Processor('stats')
export class StatsProcessor {
  @Process('calculation-request')
  async calculationRequest(job: Job<unknown>) {
    return got
      .post(
        `http://localhost:3078/dev/calculate-entity-stats`,
        {
          json: job.data,
        }
      )
      .json<any>();
  }
}
