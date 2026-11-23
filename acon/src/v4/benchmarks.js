const iberia = {
  label: 'Iberia case study',
  url: 'https://aws.amazon.com/solutions/case-studies/iberia-case-study/',
};

export const benchmarks = {
  heading: 'Modernization benchmarks',
  subheading: 'Published outcomes from engineering teams that modernized APIs, data pipelines, and legacy platforms.',
  items: [
    {
      value: '4.5 s to 50 ms',
      label: 'p90 pricing API latency',
      detail: 'Samsung measured a 90× improvement at 500 concurrent users after optimizing responses and adding edge caching. The final cache hit rate was 95%.',
      source: {
        label: 'Samsung engineering case study',
        url: 'https://aws.amazon.com/blogs/architecture/how-samsung-achieved-real-time-pricing-with-aws-lambda-response-streaming/',
      },
    },
    {
      value: '10×',
      label: 'Faster batch execution',
      detail: 'Adobe Research parallelized a sequential image inference workflow by splitting the workload across distributed compute.',
      source: {
        label: 'Adobe Research case study',
        url: 'https://aws.amazon.com/blogs/hpc/how-adobe-search-discovery-and-content-sdc-empowers-large-scale-image-ai-ml-inferencing-utilizing-aws-batch/',
      },
    },
    {
      value: '≈90%',
      label: 'Lower average microservice response time',
      detail: 'Zomato removed a database bottleneck in its billing platform. Response times stabilized around 75 ms and the platform handled four times as many transactions.',
      source: {
        label: 'Zomato engineering case study',
        url: 'https://aws.amazon.com/blogs/database/unlocking-performance-scalability-and-cost-efficiency-of-zomatos-billing-platform-by-switching-from-tidb-to-dynamodb/',
      },
    },
    {
      value: '10×',
      label: 'Deployment frequency',
      detail: 'Iberia reported a tenfold increase in release frequency after migrating its flagship site to AWS as part of a broader move to cloud microservices.',
      source: iberia,
    },
    {
      value: '55 to 6 min',
      label: 'Scale-up and rollback time',
      detail: 'Xero containerized a core application on Amazon ECS and cut scale-up and rollback times from up to 55 minutes to as little as 6.',
      source: {
        label: 'Xero case study',
        url: 'https://aws.amazon.com/solutions/case-studies/xero-ecs-case-study/',
      },
    },
    {
      value: '60%',
      label: 'Lower costs after mainframe migration',
      detail: 'Meliá Hotels reported 60% cost savings and doubled the number of availability requests it could process after modernizing its reservation platform.',
      source: {
        label: 'Meliá Hotels case study',
        url: 'https://aws.amazon.com/solutions/case-studies/melia-mainframe-migration-case-study/',
      },
    },
    {
      value: '99.99%',
      label: 'Event ingestion availability',
      detail: 'LaunchDarkly reported four-nines availability for its ingestion system as it scaled from 1 TB to 100 TB of data per day.',
      source: {
        label: 'LaunchDarkly engineering case study',
        url: 'https://aws.amazon.com/blogs/big-data/launchdarklys-journey-from-ingesting-1-tb-to-100-tb-per-day-with-amazon-kinesis-data-streams/',
      },
    },
    {
      value: '50 to 20 min',
      label: 'Mean time to resolve incidents',
      detail: 'The USDA Forest Service case study reported a 60% reduction after teams unified their observability tooling.',
      source: {
        label: 'USDA Forest Service case study',
        url: 'https://www.datadoghq.com/case-studies/usda-ecco/',
      },
    },
    {
      value: '38%',
      label: 'Lower website error rate',
      detail: 'Iberia reported fewer website errors after migrating Iberia.com. Development cycles also shortened by 40%.',
      source: iberia,
    },
    {
      value: '50%',
      label: 'Less development effort',
      detail: 'Affinidi reported a 50% reduction in software development effort and a 25% cost reduction after incrementally refactoring a distributed monolith.',
      source: {
        label: 'Affinidi re:Invent session',
        url: 'https://aws.amazon.com/video/watch/e34606c07e4/',
      },
    },
    {
      value: '15%',
      label: 'Historical bugs detectable by static typing',
      detail: 'An ICSE study found that TypeScript and Flow each detected about 15% of sampled JavaScript bugs after researchers added type annotations.',
      source: {
        label: 'Original ICSE research paper',
        url: 'https://earlbarr.com/publications/typestudy.pdf',
      },
    },
    {
      value: 'Exactly once',
      label: 'Kafka Streams processing guarantee',
      detail: 'Within its transactional scope, Kafka Streams can commit input offsets, state updates, and output records atomically. This guarantee applies to the configured Kafka Streams pipeline.',
      source: {
        label: 'Apache Kafka documentation',
        url: 'https://kafka.apache.org/27/streams/core-concepts/',
      },
    },
  ],
};
