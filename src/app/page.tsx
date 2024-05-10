"use client"
import React, { useRef } from 'react';
import { Message, chats } from './chat';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const jumpTo = (time: number, endTime: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play();
    }
    if (endTime && audioRef.current) {
      const duration = endTime - time;
      timeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }, duration * 1000);
    }
  };

  const agentMsj: string = 'bg-green-800 ml-auto';
  const userMsj: string = 'bg-green-600';

  return (
    <main className="flex min-h-screen bg-zinc-900 text-zinc-200 flex-col items-center justify-center p-4">
      <section className='max-w-[40rem] mb-4 bg-zinc-100 border rounded-md overflow-hidden'>
        <h1 className='bg-zinc-900 font-bold text-center py-2'>Llamada 1</h1>
        <audio ref={audioRef} controls preload='auto' className='h-10 w-full'>
          <source src="/assets/audio/TestCall.wav" type="audio/wav" />
        </audio>
        <section className='max-w-[40rem] border rounded-md p-2 bg-zinc-800 '>
          {chats.map((message: Message, i: number) => (
            <article onClick={() => jumpTo(message.start, message.end)} key={i} className={`${message.role == 'agent' ? agentMsj : userMsj} rounded-md p-2 w-10/12 mb-2 duration-300 select-none cursor-pointer border border-transparent hover:border-green-100`}>
              <p className={`${message.role == 'agent' && 'text-end'} text-sm text-zinc-200`}>De: {message.role}</p>
              <p>{message.content}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
