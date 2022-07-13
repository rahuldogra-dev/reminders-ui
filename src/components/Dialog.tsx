import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { FC, ReactNode, useRef, useEffect } from 'react';

interface DialogInterface {
  isOpen: boolean;
  title: string;
  closeDialog: () => void;
}

const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: React.SyntheticEvent | any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Dialog: FC<DialogInterface> = ({ isOpen, title, closeDialog }) => {
  const onKeyDown = (e: React.KeyboardEvent) =>
    (e.key === 'Escape' || e.keyCode === 27) && closeDialog();

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dialogRef, closeDialog);

  return ReactDOM.createPortal(
    <>
      {isOpen ? (
        <FocusTrap active={isOpen}>
          <div
            role='dialog'
            aria-label={`${title}-dialog`}
            aria-Dialog='true'
            className={isOpen ? 'md:container md:mx-auto' : ''}
            onKeyDown={onKeyDown}
          >
            <div
              className=' bg-white overflow-x-auto shadow-md sm:rounded-lg mt-4'
              ref={dialogRef}
            >
              <header className='flex justify-between mt-3 shadow-md sm:rounded-lg'>
                <span className='text-2xl font-bold pl-2'>
                  Delete Reminder ?
                </span>
                <div>
                  <button className='bg-red-600 text-center py-2 px-5 font-semibold text-slate-200 hover:opacity-50'>
                    Yes
                  </button>
                  <button className='bg-blue-600 text-center py-2 px-5 font-semibold text-slate-200 sm:rounded-r-lg hover:opacity-50'>
                    No
                  </button>
                </div>
              </header>
            </div>
          </div>
        </FocusTrap>
      ) : null}
    </>,
    document.body
  );
};

export default Dialog;
