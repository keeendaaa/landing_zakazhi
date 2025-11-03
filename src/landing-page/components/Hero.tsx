import openSaasBannerDark from '../../client/static/open-saas-banner-dark.png';
import openSaasBannerLight from '../../client/static/open-saas-banner-light.png';
import { Button } from '../../components/ui/button';

export default function Hero() {
  return (
    <div className='relative pt-14 w-full'>
      <TopGradient />
      <BottomGradient />
      <div className='md:p-24'>
        <div className='mx-auto max-w-8xl px-6 lg:px-8'>
          <div className='lg:mb-18 mx-auto max-w-3xl text-center'>
            <h1 className='text-5xl font-bold text-foreground sm:text-6xl'>
              Часы пик без хаоса{' '}
              <span className='text-gradient-primary'>QR-заказы, которые летят на кухню</span>
            </h1>
            <p className='mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground'>
              Уникальное фиджитал решение для вашего ресторанного бизнеса!
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' variant='outline' asChild>
                <a href='/presentation.pdf' download target='_blank' rel='noopener noreferrer'>
                  Узнать больше
                </a>
              </Button>
              <Button size='lg' variant='default' asChild>
                <a href='https://zakazhi.org' target='_blank' rel='noopener noreferrer'>
                  Начать <span aria-hidden='true'>→</span>
                </a>
              </Button>
            </div>
          </div>
          <div className='mt-14 flow-root sm:mt-14'>
            <div className='hidden md:flex m-2 justify-center rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4'>
              <img
                src={openSaasBannerLight}
                alt='App screenshot'
                width={1000}
                height={530}
                loading='lazy'
                className='rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:hidden'
              />
              <img
                src={openSaasBannerDark}
                alt='App screenshot'
                width={1000}
                height={530}
                loading='lazy'
                className='rounded-md shadow-2xl ring-1 ring-gray-900/10 hidden dark:block'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopGradient() {
  return (
    <div
      className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0'
      aria-hidden='true'
    >
      <div
        className='absolute aspect-[1020/880] w-[70rem] flex-none right-1/4 translate-x-1/2 dark:hidden opacity-20'
        style={{
          background: 'linear-gradient(to top right, #0C84FE, #2BAAFE, #00C0E8)',
          clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
        }}
      />
    </div>
  );
}

function BottomGradient() {
  return (
    <div
      className='absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl'
      aria-hidden='true'
    >
      <div
        className='relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden opacity-10 w-[90rem]'
        style={{
          background: 'linear-gradient(to bottom right, #0C84FE, #2BAAFE, #00C0E8)',
          clipPath: 'ellipse(80% 30% at 80% 50%)',
        }}
      />
    </div>
  );
}
