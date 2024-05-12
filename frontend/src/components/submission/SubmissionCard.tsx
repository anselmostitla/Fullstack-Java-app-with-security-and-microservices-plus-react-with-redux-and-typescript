
import type { SubmissionType } from '../../types/types'

import { useAppDispatch } from '../../redux/hooks';
import { acceptDeclineSubmission } from '../../redux/submission/submissionSlice'; 

type Props = {
   submitedTask: SubmissionType
}

export default function SubmissionCard(props: Props) {
   const dispatch = useAppDispatch()

   const handleAcceptSubmission = async() => {
      await dispatch(acceptDeclineSubmission({submissionId:props.submitedTask.submissionId, submissionStatus:true}))
   }

  return (
    <div className="flex justify-between p-3 bg-slate-100 w-full">

      <div className="pt-14 flex flex-row justify-between w-full">
         <div className="flex flex-col">

            <div className="flex space-x-4">
               <div>Github:</div>
               <div>{props.submitedTask.githubLink}</div>
            </div>

            <div className="flex space-x-4">
               <div>Submission time: </div>
               <div>{props.submitedTask.submissionTime}</div>
            </div>         
         </div>

         <div>
            <button onClick={() => handleAcceptSubmission()} className="bg-red-400 px-5 py-2 rounded-md border">Accept</button>
         </div>         
      </div>



    </div>
  );
}
