using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // Queries return data. Commands do not
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        // Only have one type here, as we are not returning anything
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // 'Request' holds an activity object
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Adds the activity in memory. We're not touching the database, so no async needed
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();
                
                // Return a value to let the API Controller know, that we're finished with this request
                return Unit.Value;
            }
        }
    }
}