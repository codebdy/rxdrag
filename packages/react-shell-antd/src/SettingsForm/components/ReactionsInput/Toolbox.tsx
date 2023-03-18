export const Toolbox = memo(() => {
  return (
    <Panel header={t('$componentControl')} key="componentControl">
      <ComponentList />
    </Panel>
  )
})