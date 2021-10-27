import Head from 'next/head'
const Meta = ({title,keywords,description}) => {
    return (
        <Head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
     <meta name="keywords" content={keywords}/>
     <meta name='description' content={description} />
     <meta charSet='utf-8' />
     <link rel='icon' href='/brand1.png' /> 
     <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps= {
    title:'الصراط المستقيم',
    description:"تعلم القران مع شيوخ كبار من الازهر من منزلك ",
    keywords:'حفظ قران , تلاوة , تعلم التلاوة , التجويد , احكام التجويد '
}

export default Meta
