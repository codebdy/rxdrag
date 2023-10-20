import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import EditCategoryDialog from "./EditCategoryDialog"
import ProcessModal from "./ProcessModal"
import { TreeNodeLabel } from "@rxdrag/uml-editor"
import { IProcessCategory } from "../../interfaces/process"


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

  const handleVisableChange = useCallback((visible: boolean) => {
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
      {category.name}
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
          categoryId={category?.id}
          isModalVisible={pageModalOpen}
          onClose={handleClosePageModal}
        />
      </div>
    </TreeNodeLabel>
  )
}

export default CategoryLabel