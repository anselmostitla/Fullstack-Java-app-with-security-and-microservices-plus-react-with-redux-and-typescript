
export default function About() {

  return (
    <div className="w-[80%] min-h-screen border flex flex-col mx-auto p-5 space-y-10">
      <h1 className="text-center text-3xl font-semibold">Fullstack application about management task</h1>

      <h3>
        The backend was implemented using java, spring boot, spring boot security, spring data cloud and three microservices. <br /> 

        First we configured the databases with mysql for the three microservices: user, task and submission. Then for each microservice, we defined the model, the repository, the business logic or service and the controllers which are in charge of receiving petitions from the client. <br />

        For this part we used the model view controller design pattern.
      </h3>

      <h3>
        And the frontent was implemented using react with typescript, redux and context for state management. 
      </h3>

      <div>
        
      </div>
    </div>
  );
}