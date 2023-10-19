import TreeNodeLabel from "common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import EditCategoryDialog from "./EditCategoryDialog"
import ProcessModal from "./ProcessModal"
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage"
import { IProcessCategory } from "model"

const CategoryLabel = (
  props: {
    categories: IProcessCategory[],
    category: IProcessCategory
  }
) => {
  const { categories, category } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const p = useParseLangMessage();

  const handleVisableChange = useCallback((visible: any) => {
    setVisible(visible)
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [])

  const handleEdit = useCallback(() => {
    setModalOpen(true);
  }, [])

  const handleAddPage = useCallback(() => {
    setPageModalOpen(true);
  }, [])

  const handleClosePageModal = useCallback(() => {
    setPageModalOpen(false);
  }, []);


  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        <CategoryActions
          id={category.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
          onAddPage={handleAddPage}
        />
      }
    >
      {p(category.name)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditCategoryDialog
          category={category}
          isModalVisible={modalOpen}
          onClose={handleCloseModal}
        />
        <ProcessModal
          categories={categories}
          categoryUuid={category?.uuid}
          isModalVisible={pageModalOpen}
          onClose={handleClosePageModal}
        />
      </div>
    </TreeNodeLabel>
  )
}

export default CategoryLabel