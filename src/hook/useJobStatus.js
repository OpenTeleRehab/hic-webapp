import { useEffect, useState } from 'react';

export function useJobStatus (jobId) {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const evtSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/job-trackers/${jobId}`);
    evtSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStatus(data.status);
      if (['completed', 'failed'].includes(data.status)) {
        evtSource.close();
      }
    };
    return () => evtSource.close();
  }, [jobId]);

  return status;
}

export function useJobStatuses (jobIds) {
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    if (!jobIds || !jobIds.length) return;

    const eventSources = {};

    jobIds.forEach(jobId => {
      const evtSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/job-trackers/${jobId}`);
      eventSources[jobId] = evtSource;

      evtSource.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setStatuses(prev => ({ ...prev, [jobId]: data.status }));

        if (['completed', 'failed'].includes(data.status)) {
          evtSource.close();
        }
      };

      evtSource.onerror = () => {
        evtSource.close();
      };
    });

    return () => Object.values(eventSources).forEach(es => es.close());
  }, [jobIds]);

  return statuses;
}
