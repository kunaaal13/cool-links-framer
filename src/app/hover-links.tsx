'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HoverLink() {
  return (
    <section className='bg-neutral-950 p-4 md:p-8 min-h-screen overflow-x-hidden'>
      <div className='mx-auto max-w-5xl'>
        <Link
          heading='About'
          subheading='Learn what we do here'
          imgSrc='https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D'
          href='#'
        />
        <Link
          heading='Clients'
          subheading='We work with great people'
          imgSrc='https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          href='#'
        />
        <Link
          heading='Portfolio'
          subheading='Our work speaks for itself'
          imgSrc='https://plus.unsplash.com/premium_photo-1661889099855-b44dc39e88c9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          href='#'
        />
        <Link
          heading='Careers'
          subheading='We want cool people'
          imgSrc='https://images.unsplash.com/photo-1617243876873-6cea4ea0b4eb?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          href='#'
        />
        <Link
          heading='Fun'
          subheading="Incase you're bored"
          imgSrc='https://images.unsplash.com/photo-1618807963539-959eec192dce?q=80&w=2789&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          href='#'
        />
      </div>
    </section>
  )
}

export default HoverLink

function Link({
  heading,
  subheading,
  imgSrc,
  href,
}: {
  heading: string
  subheading: string
  imgSrc: string
  href: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const top = useTransform(y, [-0.5, 0.5], ['40%', '60%'])
  const left = useTransform(x, [-0.5, 0.5], ['60%', '70%'])

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current?.getBoundingClientRect()

    if (!rect) return

    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.a
      ref={ref}
      initial='initial'
      whileHover='whileHover'
      onMouseMove={handleMouseMove}
      href={href}
      className='group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 md:py-8 hover:border-neutral-50'
    >
      <div>
        <motion.span
          variants={{
            initial: {
              x: 0,
            },
            whileHover: {
              x: -16,
            },
          }}
          transition={{
            type: 'spring',
            delayChildren: 0.25,
            staggerChildren: 0.075,
          }}
          className='relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 md:text-6xl group-hover:text-neutral-50'
        >
          {heading.split('').map((letter, i) => (
            <motion.span
              variants={{
                initial: {
                  x: 0,
                },
                whileHover: {
                  x: 16,
                },
              }}
              key={i}
              className='inline-block'
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <motion.span className='relative z-10 mt-2 block text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50'>
          {subheading}
        </motion.span>
      </div>

      <motion.img
        variants={{
          initial: {
            scale: 0,
            rotate: '-12.5deg',
          },
          whileHover: {
            scale: 1,
            rotate: '12.5deg',
          },
        }}
        transition={{
          type: 'spring',
        }}
        style={{
          top,
          left,
          translateX: '-50%',
          translateY: '-50%',
        }}
        src={imgSrc}
        alt={`Img for ${heading}`}
        className='absolute z-0 h-24 w-32 rounded-lg object-cover md:h-36 md:w-48'
      />

      <motion.div
        variants={{
          initial: {
            x: '25%',
            opacity: 0,
          },
          whileHover: {
            x: 0,
            opacity: 1,
          },
        }}
        transition={{
          type: 'spring',
        }}
        className='relative z-10 p-4'
      >
        <ArrowRight size={48} className=' text-neutral-50' />
      </motion.div>
    </motion.a>
  )
}
