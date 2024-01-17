'use client';

import { MessageSquareDashed, Send } from 'lucide-react';
import React, { useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PulseLoader } from 'react-spinners';
import clsx from 'clsx';
import { sendFeedback } from '@/actions/actions';
import { HiSparkles } from 'react-icons/hi';
import Link from 'next/link';

export default function Feedback({
  feedbackLocal,
  user,
}: {
  feedbackLocal: any;
  user: any;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [countdown, setCountdown] = React.useState(2);
  const [loading, setLoading] = React.useState(true);
  const [inputText, setInputText] = React.useState('');
  const [inputFocus, setInputFocus] = React.useState(false);

  const [notification, setNotification] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
    setCountdown(2);
    setLoading(true);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (modalOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (modalOpen && countdown === 0) {
      setLoading(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [modalOpen, countdown]);

  React.useEffect(() => {
    const handleClickOutside: EventListener = (event: Event) => {
      const target = event.target as HTMLElement;

      if (modalOpen && !target.closest('.modal-container')) {
        setModalOpen(false);
        setCountdown(2);
        setLoading(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalOpen]);

  const handleSubmit = async () => {
    setInputText('');
    const response: any = await sendFeedback(inputText);
    if (response.success) {
      sendNotification();
    } else {
      console.log('error');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      setInputText('');
      handleSubmit();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const sendNotification = () => {
    setNotification(true);

    setTimeout(() => {
      setNotification(false);
    }, 6000);
  };
  

  return (
    <div className="z-[999] bottom-10 right-10 fixed flex flex-col gap-2 items-end ">
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ y: 75, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            exit={{ opacity: 0, y: 10 }}
            className="modal-container overflow-hidden rounded-lg border border-border relative w-64 h-80 bg-primary-foreground"
          >
            <div className="p-3 font-medium flex items-center h-12 w-full border-b border-border bg-primary/10">
              {feedbackLocal.title}
            </div>
            <div className="p-3 flex flex-col gap-4 justify-between h-[17rem]">
              <motion.div
                initial={{ opacity: 0, height: 30 }}
                animate={{ opacity: 1, height: loading ? 30 : 135 }}
                exit={{ opacity: 0, y: 10, height: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-primary p-2 text-sm text-primary-foreground rounded-t-lg rounded-br-lg w-[85%]"
              >
                {loading ? (
                  <>
                    <div className="dark:hidden block">
                      <PulseLoader
                        size={10}
                        speedMultiplier={0.5}
                        loading={loading}
                        color="#fff"
                      />
                    </div>
                    <div className="dark:block hidden">
                      <PulseLoader
                        size={10}
                        speedMultiplier={0.5}
                        loading={loading}
                        color="#0B0F18"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {user ? (
                      <>
                        <p className="line-clamp-1">{feedbackLocal.greeting}, {user.name}!</p>
                        <p>{feedbackLocal.message}</p>
                        <Link className='underline text-blue-500 break-all' href='https://forms.gle/sxWAJfub77B39edz8' target='_blank'>https://forms.gle/sxWAJfub77B39edz8</Link>
                      </>
                    ) : (
                      <p>{feedbackLocal.message}</p>
                    )}
                  </>
                )}
              </motion.div>

              <AnimatePresence>
                {notification && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    className="text-sm items-center flex-col flex gap-2 w-full p-3 bg-primary/10 rounded-l-lg rounded-tr-lg"
                  >
                    <HiSparkles size={20} />
                    <h1>{feedbackLocal.appreciation}</h1>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3 w-full">
                <div
                  className={clsx(
                    'disabled:opacity-50 transition h-11 duration-200 p-2 rounded-lg border-border border',
                    inputFocus && 'border-primary'
                  )}
                >
                  <textarea
                    value={inputText}
                    onBlur={() => setInputFocus(false)}
                    onFocus={() => setInputFocus(true)}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyPress}
                    className="disabled:cursor-not-allowed bg-transparent resize-none transition outline-none w-full"
                    rows={1}
                    disabled={true}/* {loading || isPending} */
                    placeholder={feedbackLocal.placeholder}
                  />
                </div>

                <button
                  onClick={() => {
                    startTransition(() => {
                      handleSubmit();
                    });
                  }}
                  disabled={true}/* {loading || inputText.length == 0 || isPending} */
                  className="group transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 p-2 w-11 h-11 flex items-center justify-center text-primary-foreground aspect-square bg-primary rounded-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={handleModalOpen}
        className="shadow-xl dark:shadow-white/10 bg-primary-foreground/90 border border-border rounded-full hover:bg-border p-4 transition duration-200"
      >
        <MessageSquareDashed />
      </button>
    </div>
  );
}
