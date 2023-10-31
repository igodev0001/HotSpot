import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Menu from './Menu';
import 'fontsource-roboto';
import Copyright from './Copyright';

const Home = () => {

  const carouselItems = [
    {
      id: '1',
      imgSrc: '/assets/Carouselimages/1.jpg',
      alt: 'Banner'
    },
    {
      id: '2',
      imgSrc: '/assets/Carouselimages/2.jpg',
      alt: 'Banner'
    },
    {
      id: '3',
      imgSrc: '/assets/Carouselimages/3.jpg',
      alt: 'Banner'
    },
    {
      id: '4',
      imgSrc: '/assets/Carouselimages/4.jpg',
      alt: 'Banner'
    },
    {
      id: '5',
      imgSrc: '/assets/Carouselimages/5.jpg',
      alt: 'Banner'
    },
  ];

  // const categoryItems = [
  //   {
  //     id: '1',
  //     imgSrc: '/assets/category/cellphone.jpg',
  //     category: 'CellPhone',
  //     alt: 'category'
  //   },
  //   {
  //     id: '2',
  //     imgSrc: '/assets/category/desktop.jpg',
  //     category: 'Computer',
  //     alt: 'category'
  //   },
  //   {
  //     id: '3',
  //     imgSrc: '/assets/category/gaming.jpg',
  //     category: 'Gaming',
  //     alt: 'category'
  //   },
  //   {
  //     id: '4',
  //     imgSrc: '/assets/category/watch.jpg',
  //     category: 'Watch',
  //     alt: 'category'
  //   },
  // ];
  
  const carouselItem = (item) => (
    <div key={item.id}>
      <img 
        src={item.imgSrc}
        alt={item.alt}
        height='800px'
        width='100%'
        className='object-cover w-full h-[350px]'
        draggable={false}
      />
    </div>
  )
  return (
      <div style={{'marginTop': '70px', 'backgroundColor': '#f0f2f5'}}>
        <Menu />
        {/* <Search /> */}
        <Carousel animation='fade' duration={2000} interval={4000} style={{'width': '100vw', 'height': '80vh'}}>
          { carouselItems.map((item) => carouselItem(item))}
        </Carousel>
        {/* <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h2 className='mb-2'>New Arrivals</h2>
            <div className='row'>
              {productsByArrival.map((product, i) => (
                <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                  <Card product={product} />
                </div>
              ))}
            </div>
            <h2 className='mb-2 mt-4'>Best Sellers</h2>
            <div className='row'>
              {productsBySell.map((product, i) => (
                <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className='col-md-1'></div>
        </div> */}

        {/* <div className='container p-5  bg-white'>
          <div class="mb-5">
          <h3 class="text-[28px] text-center font-bold uppercase">Shop <b class="text-sky-500">Categories</b></h3>
          <p class="text-center">You can see all the catetories here and please check them out by one click.</p>
          </div>
          <div className='row'>
            {categoryItems.map((item) => (

                <div className='col-md-3 hoverPicture'>   
                    <div key={item.id}>
                      <a href='/shop' style={{'textDecoration': 'none'}}>
                          <img 
                            src={item.imgSrc}
                            alt={item.alt}
                            height={200}
                            width='100%'
                            style={{'objectFit': 'cover', 'borderRadius': '10px'}}
                            className='object-cover w-full h-[350px]'
                            draggable={false}
                          />
                      </a> 
                    </div>
                    <br />
                    <div style={{'textAlign': 'center'}}>
                      <h5>{item.category}</h5>
                    </div>
                </div>

            ))}
          </div>
        </div> */}

        <Copyright />
      </div>
  );
};

export default Home;
