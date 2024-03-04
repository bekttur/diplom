import { IResult } from '../../../../app.interface';


const Result: React.FC<IResult> = ({data, handleDialect}) => {
	return (
		<div className='w-full h-fit p-5'>
          <h1>Result</h1>
          {data && data.map((item, index) => {
              if(item.title.toLowerCase() === handleDialect.toLowerCase()){
                return (
                  <div key={index}>{item.title}</div>
                )
              }
          })  
        }
      </div>
	)
}

export default Result