import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';
import { be } from 'date-fns/locale';

const jobs = [ CancellationMail ];

class Queue {
     constructor() {
         this.queues = {};

         this.init();
     }

     init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig,
            }),
            handle,
            };
        });
     }
     add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
     }

     pocessQueue() {
         jobs.forEach(job => {
             const { bee, handle } = this.queues[job.key];

             bee.on('failed', this.handleFailure).process(handle);
         })
     }
     handleFailure(job, err) {
        console.log(`Queue ${job.queue.name}: FALHOU!`, err)
     }
}

export default new Queue();
