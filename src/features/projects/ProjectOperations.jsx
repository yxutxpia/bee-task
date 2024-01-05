import Filter from '../../ui/Filter';

function ProjectOperations() {
  return (
    <Filter
      filterField="status"
      options={[
        { value: 'all', label: 'All' },
        { value: 'not-started', label: 'Not started' },
        { value: 'in-progress', label: 'In progress' },
        { value: 'complete', label: 'Complete' },
      ]}
    />
  );
}

export default ProjectOperations;
