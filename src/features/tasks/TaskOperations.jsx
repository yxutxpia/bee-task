import Filter from '../../ui/Filter';

function TaskOperations() {
  return (
    <Filter
      filterField="status"
      options={[
        { value: 'all', label: 'All' },
        { value: 'not-started', label: 'Not started' },
        { value: 'in-progress', label: 'In progress' },
        { value: 'complete', label: 'Complete' },
        { value: 'priority', label: 'Priority' },
      ]}
    />
  );
}

export default TaskOperations;
