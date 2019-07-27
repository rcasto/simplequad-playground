declare module "worker-loader!*" {
    class QuadWorker extends Worker {
      constructor();
    }
  
    export default QuadWorker;
  }