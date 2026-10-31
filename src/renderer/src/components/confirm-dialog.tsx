import { useConfirmStore } from '../store/use-confirm-store'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog'

export default function ConfirmDialog(): JSX.Element {
  const options = useConfirmStore((s) => s.options)
  const close = useConfirmStore((s) => s.close)

  return (
    <AlertDialog
      open={options !== null}
      onOpenChange={(open) => {
        if (!open) {
          close()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options?.title}</AlertDialogTitle>
          {options?.content && <AlertDialogDescription>{options.content}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            variant={options?.destructive ? 'destructive' : 'default'}
            onClick={() => {
              options?.onOk()
              close()
            }}
          >
            {options?.confirmText ?? '确定'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
